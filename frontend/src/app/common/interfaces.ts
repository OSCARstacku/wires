//-------------For Observables Options ----------------
export interface NavBar {
    hidden: Boolean;
};

export interface LanguageObserv {
    Idiom: string;
    prefix: string;
    flag: string;
};

export interface Preloader {
    on: boolean;
}


export interface CurrentUser {
    currentUser: any;
    roleUser: any;
}

// ---------------------------------------------

// //-----------------Components----------------

// User
export interface UserObserv {
    usersOfInterface: any;
};

export interface UserDetailObserv {
    userDetailObserv : any
}

// Message
export interface MessageObserv {
    messagesOfInterface: any;
};

export interface ProductDetailObserv {
    productDetailObserv : any
}