
import {CatalogSituation} from 'language/catalogSituation';


const catalogSituationAuth: CatalogSituation = {
    
    'NotLoggedIn': {
        kind: 'error'
    },

    'LogIn_Failed': {
        kind: 'error'
    },
    
    
    
    'SignUp_Succeeded': {
        kind: 'success'
    },
    'SignUp_DuplicateEmail': {
        kind: 'error'
    },
    'SignUp_UnknownError': {
        kind: 'error'
    }
    

}

export default catalogSituationAuth;