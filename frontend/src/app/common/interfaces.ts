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

// Product
export interface ProductObserv {
    productsOfInterface: any;
};

export interface ProductDetailObserv {
    productDetailObserv : any
}