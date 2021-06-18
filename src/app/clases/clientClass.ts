export class ClientClass{
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public phone: string,
        public address: string,
        public campCode: string,
    ){}

    static fromJson(obj: any){
        return new ClientClass(
            obj['id'],
            obj['name'],
            obj['lastname'],
            obj['phone'],
            obj['address'],
            obj['campCode'],
        );
    }
}