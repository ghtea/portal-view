import { useTranslation } from 'react-i18next';
import translationEn from 'language/translation/en.json';

type Translation = typeof translationEn;

type Dictionary = string | DictionaryObject;
type DictionaryObject = { [ K1: string]: Dictionary };

interface TypedTFunction<D extends Dictionary> {
    
    <K1 extends keyof D>
        (args: K1): D[K1];
        
    <K1 extends keyof D, K2 extends keyof D[K1]>
        (...args: [K1, K2]): D[K1][K2];
        
    <K1 extends keyof D, K2 extends keyof D[K1], K3 extends keyof D[K1][K2]>
        (...args: [K1, K2, K3]): D[K1][K2][K3];
        
    <K1 extends keyof D, K2 extends keyof D[K1], K3 extends keyof D[K1][K2], K4 extends keyof D[K1][K2][K3]>
        (...args: [K1, K2, K3, K4]): D[K1][K2][K3][K4];  
        
    // ... up to a reasonable key parameters length of your choice ...
}

function useTranslationTyped(): { t: TypedTFunction<typeof translationEn> } {
    const { t } = useTranslation();
    // implementation goes here. Here join keys by dot (depends on your options)
    return { 
        
        t(...keys: string[]) { 
            
            return t(keys.join(".")) 
            
        } 
        
    }
}

/*
function separateKey(stringAllKeys:string) {
    return stringAllKeys.split(".");
}
*/


export default useTranslationTyped;



// https://stackoverflow.com/questions/58277973/how-to-type-check-i18n-dictionaries-with-typescript