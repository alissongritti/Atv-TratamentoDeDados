import * as fs from 'fs/promises'; 
import * as path from 'path';

// --- 1. CONFIGURAÇÃO ---
const nomeArquivoEntrada: string = "nomes.csv";
const nomeArquivoSaida: string = "nomes_atualizado.csv";

const caminhoArquivoEntrada: string = path.join(__dirname, nomeArquivoEntrada);
const caminhoArquivoSaida: string = path.join(__dirname, nomeArquivoSaida);

const preposicoes: string[] = ["de", "da", "das", "do", "dos", "e"];

// --- 2. FUNÇÕES MODULARES ---

/**
 * Capitaliza a primeira letra de cada palavra em um nome, exceto preposições.
 * @param nomeCompleto O nome a ser formatado.
 * @returns O nome formatado.
 */
function capitalizarNome(nomeCompleto: string): string {
    const nomeLimpo: string = nomeCompleto.trim().toLowerCase();

    const palavrasDoNome: string[] = nomeLimpo.split(" ");

    const palavrasFormatadas: string[] = palavrasDoNome.map(palavra => {
        if (preposicoes.includes(palavra)) {
            return palavra; 
        } else {
            return palavra.charAt(0).toUpperCase() + palavra.substring(1);
        }
    });
    return palavrasFormatadas.join(" ");
}

/**
 * Função principal para ler, processar e salvar o arquivo de nomes.
 */
async function processarArquivo(): Promise<void> {
    try {
        const conteudoArquivo: string = await fs.readFile(caminhoArquivoEntrada, "utf-8");
        const nomesDoArquivo: string[] = conteudoArquivo.split("\n").filter(Boolean);
        const nomesFormatados: string[] = nomesDoArquivo.map(nome => capitalizarNome(nome));
        const conteudoParaSalvar: string = nomesFormatados.join("\n");
        await fs.writeFile(caminhoArquivoSaida, conteudoParaSalvar, "utf-8");

        console.log("--- Processamento concluído! ---");
        console.log(`Nomes convertidos com sucesso e salvos em: ${nomeArquivoSaida}`);
    } catch (erro: any) {
        console.error(`Erro ao processar o arquivo: ${erro.message}`);
    }
}

// Executa a função principal.
processarArquivo();