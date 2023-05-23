export default interface Country{
    flags: {
        png: string,
        svg: string,
        alt: string
    }
    name: {
        common: string,
        official: string,
        nativeName: Record<string, {
            official: string,
            common: string
        }>
    }
    cca2:string;
    region:string;
    subregion:string;
    capital:string[];
    tld:string[];
    borders:string[];
    population:number;
    languages:Object;
    currencies:Object;

}