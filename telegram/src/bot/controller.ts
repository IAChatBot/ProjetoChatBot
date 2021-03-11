
import { text } from 'express';
import TelegramBot from  'node-telegram-bot-api';
import { User } from './User';


enum STATUS{
    NEXT_NOME,
    NEXT_CPF,
    NEXT_DATANASCIMENTO,
    NEXT_MENUPRINCIPAL,
    NEXT_MENUSECUNDARIO,
    NEXT_MENUTERCEIRO,
    NEXT_MENUQUARTO
}

type MessageDictionary ={
    [key: string]:{
        status: STATUS,
        value:{
            nome?:string,
            menu?:string,
            datanascimento?:string,
            buraconavia?:string

        }
    }
}

var MENUPRINCIPAL = 0;
var MENUSECUNDARIO = 0;
var MENUTERCEIRO = 0;
var MENUQUARTO = 0;

function init(){
    const bot = new TelegramBot(process.env.token as string, {polling: true});
    const messagedictionary : MessageDictionary ={};


    bot.on("message", (message)=> {
        if(messagedictionary[message.chat.id] === undefined){
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_NOME,
                value: {

                }

            }

            bot.sendMessage(message.chat.id, "Olá! Por favor favor digite seu cpf para dar inicio ao atendimento")
        }

        /*
        if(messagedictionary[message.chat.id].status === null){
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUPRINCIPAL,
                value: {                   

                }                
            }
            bot.sendMessage(message.chat.id, "Hummmm, verifiquei que você ainda não tem um cadastro, para dar sequencia com seu atendimento preciso de alguns dados.\n"+
                "Leva menos de um minutinho e só será necessário este cadastro uma unica vez, por favor digite os dados solicitados abaixo na ordem correta.\n"+
                "Nome:\nCPF:\nData de Nascimento:\nSexo:\nE-mail:\nRua:\nCEP:\nNº:\nComplemento:\nBairro:")
        }
        */

        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_NOME){
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUPRINCIPAL,
                value: {
                    ...messagedictionary[message.chat.id].value,
                    nome: message.text
                }

            }
            bot.sendMessage(message.chat.id, 'Por favor, selecione a opção desejada\n1 - Pavimentação\n2 - Recursos Hidricos\n3 - Assistencia Social')
        }
        
        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_MENUPRINCIPAL && MENUPRINCIPAL ===0){
            MENUPRINCIPAL = 1;
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUSECUNDARIO,
                value: {
                    ...messagedictionary[message.chat.id].value,
                    menu: message.text
                }

            }
            bot.sendMessage(message.chat.id, 'Por favor, selecione a opção desejada\n1 - Buraco na Via\n2 - Calçada\n3 - Sinalização')
        }

        //////////////////////////////1 - Buraco na Via//////////////////////////
        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_MENUSECUNDARIO && MENUPRINCIPAL === 1 && MENUSECUNDARIO ===0){
            MENUSECUNDARIO = 1;
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUTERCEIRO,
                value: {
                    ...messagedictionary[message.chat.id].value,
                    datanascimento: message.text
                }              

            }
            bot.sendMessage(message.chat.id, 'Por favor, informe o endereço do lugar afetado.')          
        
        }

        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_MENUTERCEIRO && MENUPRINCIPAL === 1 && MENUSECUNDARIO ===1 && MENUTERCEIRO ==0){
            MENUTERCEIRO = 1;
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUQUARTO,
                value: {
                    ...messagedictionary[message.chat.id].value,
                    buraconavia: message.text
                }

            }
            bot.sendMessage(message.chat.id, 'Por favor, nos envie uma foto do local') 
        }

        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_MENUQUARTO && MENUPRINCIPAL === 1 && MENUSECUNDARIO ===1 && MENUTERCEIRO ===1 && MENUQUARTO ===0){
            MENUQUARTO = 1;
                messagedictionary[message.chat.id] = {
                    status: STATUS.NEXT_MENUQUARTO,
                    value: {
                        ...messagedictionary[message.chat.id].value,
                        buraconavia: message.text
                    }
    
                }    
            bot.sendMessage(message.chat.id, 'Muito obriigado! Sua ajuda é muito importante para melhoria da cidade, sua solicitação em breve será encaminhada para a area responsável.  :)')

            
        }

        ////////////2 - Calçada///////////////////////////////
        else if(messagedictionary[message.chat.id].status === STATUS.NEXT_MENUSECUNDARIO && MENUPRINCIPAL === 1 && MENUSECUNDARIO ===0){
            MENUSECUNDARIO = 2;
            messagedictionary[message.chat.id] = {
                status: STATUS.NEXT_MENUTERCEIRO,
                value: {
                    ...messagedictionary[message.chat.id].value,
                    datanascimento: message.text
                }              

            }
            bot.sendMessage(message.chat.id, 'Por favor, seleciona a opção desejada\n1 - Avaria\n2 - Acessibilidade\n3 - Construção de Nova Calçada')          
        
        }

        const {nome, menu, datanascimento, buraconavia} = messagedictionary[message.chat.id].value;
        const user = new User(nome!,  menu!, datanascimento!, buraconavia!);

            //bot.sendMessage(message.chat.id, user.createsubscription());
    })
}

const BotController = {init};
export default BotController;