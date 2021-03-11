export class User{
    constructor(private name: string, private menu: string, private datanascimento: string, private buraconavia: string){

    }

    public createsubscription(){
        return 'Obrigado! ${message.text}, sua solicitação foi encaminhada ao setor responsavel e em breve será atendida!'
    }
}