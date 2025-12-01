#!/usr/bin/env node

/**
 * Script para análise automática de strings hardcoded no código Flowise UI
 *
 * Uso: node analyze-strings.js [diretório]
 * Exemplo: node analyze-strings.js src/views
 */

const fs = require('fs');
const path = require('path');

// Padrões regex para identificar strings hardcoded
const patterns = {
    // Strings em JSX/JS
    jsxString: /(['"`])((?:(?=(\\?))\3.)*?)\1/g,
    // Typography com texto
    typography: /<Typography[^>]*>([^<]+)<\/Typography>/g,
    // Labels em objetos
    label: /label:\s*['"]([^'"]+)['"]/g,
    // Placeholders
    placeholder: /placeholder:\s*['"]([^'"]+)['"]/g,
    // Títulos
    title: /title:\s*['"]([^'"]+)['"]/g,
    // Mensagens
    message: /message:\s*['"]([^'"]+)['"]/g,
    // Botões
    buttonText: /<Button[^>]*>([^<]+)<\/Button>/g,
    // Alertas
    alert: /<Alert[^>]*>([^<]+)<\/Alert>/g,
};

// Strings comuns que devem ser ignoradas
const ignorePatterns = [
    /^[a-z]+$/i, // Palavras simples sem contexto
    /^\d+$/, // Números
    /^[{}[\]]+$/, // Apenas caracteres especiais
    /^(px|rem|em|%|vh|vw)$/i, // Unidades CSS
    /^(true|false|null|undefined)$/i, // Valores booleanos
    /^(http|https|www\.)/i, // URLs
    /^#[0-9a-fA-F]{3,6}$/, // Cores hex
    /^[\w-]+\.(js|jsx|ts|tsx|json|css|scss|svg|png|jpg|jpeg|gif)$/i, // Nomes de arquivos
];

// Categorias de strings baseadas no contexto do arquivo
const categorizeString = (filePath, string, lineNumber) => {
    const relativePath = path.relative(process.cwd(), filePath);
    const category = relativePath.split(path.sep)[0];

    // Determinar categoria baseada no caminho do arquivo
    if (relativePath.includes('auth')) {
        return 'auth';
    } else if (relativePath.includes('workspace')) {
        return 'workspace';
    } else if (relativePath.includes('menu-items')) {
        return 'menu';
    } else if (relativePath.includes('store/constant')) {
        return 'errors';
    } else if (relativePath.includes('ErrorBoundary')) {
        return 'errors';
    } else if (relativePath.includes('layout')) {
        return 'header';
    } else {
        return 'common';
    }
};

// Verificar se string deve ser ignorada
const shouldIgnore = (string) => {
    // Remover espaços extras
    const trimmed = string.trim();

    // Verificar padrões de ignorar
    for (const pattern of ignorePatterns) {
        if (pattern.test(trimmed)) {
            return true;
        }
    }

    // Ignorar strings muito curtas ou muito longas
    if (trimmed.length < 2 || trimmed.length > 200) {
        return true;
    }

    // Ignorar strings que são apenas espaços ou caracteres especiais
    if (!/[a-zA-Z]/.test(trimmed)) {
        return true;
    }

    return false;
};

// Extrair strings de um arquivo
const extractStringsFromFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const strings = [];

    lines.forEach((line, index) => {
        // Procurar por strings em aspas simples, duplas ou template literals
        const stringMatches = line.matchAll(patterns.jsxString);

        for (const match of stringMatches) {
            const string = match[2];

            if (!shouldIgnore(string)) {
                strings.push({
                    string: string,
                    line: index + 1,
                    file: filePath,
                    category: categorizeString(filePath, string, index + 1),
                    context: line.trim()
                });
            }
        }

        // Procurar por padrões específicos
        for (const [patternName, pattern] of Object.entries(patterns)) {
            if (patternName === 'jsxString') continue;

            const matches = line.matchAll(pattern);
            for (const match of matches) {
                const string = match[1] || match[0];
                if (!shouldIgnore(string)) {
                    strings.push({
                        string: string,
                        line: index + 1,
                        file: filePath,
                        category: categorizeString(filePath, string, index + 1),
                        pattern: patternName,
                        context: line.trim()
                    });
                }
            }
        }
    });

    return strings;
};

// Escanear diretório recursivamente
const scanDirectory = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            // Ignorar node_modules e outros diretórios
            if (!['node_modules', '.git', 'dist', 'build'].includes(file)) {
                scanDirectory(filePath, fileList);
            }
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
            fileList.push(filePath);
        }
    });

    return fileList;
};

// Gerar proposta de chave de tradução
const generateTranslationKey = (string, category, filePath) => {
    // Normalizar string para criar chave
    const normalized = string
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '.')
        .substring(0, 50);

    return `${category}.${normalized}`;
};

// Função principal
const main = () => {
    const targetDir = process.argv[2] || 'src';
    const fullPath = path.resolve(targetDir);

    if (!fs.existsSync(fullPath)) {
        console.error(`Diretório não encontrado: ${fullPath}`);
        process.exit(1);
    }

    console.log(`Escaneando diretório: ${fullPath}\n`);

    const files = scanDirectory(fullPath);
    const allStrings = [];

    files.forEach(file => {
        try {
            const strings = extractStringsFromFile(file);
            allStrings.push(...strings);
        } catch (error) {
            console.error(`Erro ao processar ${file}:`, error.message);
        }
    });

    // Agrupar por categoria
    const grouped = {};
    allStrings.forEach(item => {
        if (!grouped[item.category]) {
            grouped[item.category] = [];
        }
        grouped[item.category].push(item);
    });

    // Gerar relatório
    console.log('=== RELATÓRIO DE ANÁLISE DE STRINGS ===\n');
    console.log(`Total de arquivos analisados: ${files.length}`);
    console.log(`Total de strings encontradas: ${allStrings.length}\n`);

    console.log('Distribuição por categoria:');
    Object.keys(grouped).forEach(category => {
        console.log(`  ${category}: ${grouped[category].length} strings`);
    });

    // Gerar JSON estruturado
    const output = {
        metadata: {
            generatedAt: new Date().toISOString(),
            totalFiles: files.length,
            totalStrings: allStrings.length,
            targetDirectory: targetDir
        },
        strings: allStrings.map(item => ({
            string: item.string,
            key: generateTranslationKey(item.string, item.category, item.file),
            category: item.category,
            file: path.relative(process.cwd(), item.file),
            line: item.line,
            context: item.context.substring(0, 100)
        })),
        grouped: grouped
    };

    // Salvar resultado em arquivo JSON
    const outputFile = path.join(__dirname, 'strings-analysis.json');
    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));

    console.log(`\nResultado salvo em: ${outputFile}`);
    console.log('\n=== ANÁLISE CONCLUÍDA ===');
};

// Executar se chamado diretamente
if (require.main === module) {
    main();
}

module.exports = { extractStringsFromFile, scanDirectory, generateTranslationKey };

