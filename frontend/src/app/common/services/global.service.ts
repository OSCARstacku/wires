import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { NavBar, Preloader, CurrentUser, LanguageObserv, UserObserv, UserDetailObserv, ProductObserv, ProductDetailObserv } from '../interfaces';


@Injectable()
export class GlobalService {

    // Global
    private globalObservablePrivate: BehaviorSubject<NavBar> = new BehaviorSubject<NavBar>({ hidden: true });

    get globalObservable() {
        return this.globalObservablePrivate.asObservable();
    }

    set globalObservableData(dataGlobal:NavBar) {
        this.globalObservablePrivate.next(dataGlobal);
    }

    // ------------------------------------------------------

    // Preloader
    private preloaderObservablePrivate: BehaviorSubject<Preloader> = new BehaviorSubject<Preloader>({ on: false });

    get preloaderObservable() {
        return this.preloaderObservablePrivate.asObservable();
    }

    set preloaderObservableData(dataPreloader:Preloader) {
        this.preloaderObservablePrivate.next(dataPreloader);
    }

    // ------------------------------------------------------

    // Language
    private languageObservablePrivate: BehaviorSubject<LanguageObserv> = new BehaviorSubject<LanguageObserv>({ Idiom: "", prefix: "", flag: "" });

    get languageObservable() {
        return this.languageObservablePrivate.asObservable();
    }

    set languageObservableData(dataLanguage:LanguageObserv) {
        this.languageObservablePrivate.next(dataLanguage);
    }

    // ------------------------------------------------------

    // Current User
    private currentUserObservablePrivate: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>({ currentUser: "", roleUser: "" });

    get currentUserObservable() {
        return this.currentUserObservablePrivate.asObservable();
    }

    set currentUserObservableData(dataCurrentUser:CurrentUser) {
        this.currentUserObservablePrivate.next(dataCurrentUser);
    }

    // ------------------------------------------------------

    // User
    private userObservablePrivate: BehaviorSubject<UserObserv> = new BehaviorSubject<UserObserv>({ usersOfInterface : "" });

    get userObservable() {
        return this.userObservablePrivate.asObservable();
    }

    set userObservableData(dataUser:UserObserv) {
        this.userObservablePrivate.next(dataUser);
    }

    // ------------------------------------------------------

    // User Detail
    private userDetailObservablePrivate: BehaviorSubject<UserDetailObserv> = new BehaviorSubject<UserDetailObserv>({ userDetailObserv : "" });

    get userDetailObservable() {
        return this.userDetailObservablePrivate.asObservable();
    }

    set userDetailObservableData(dataUserDetail:UserDetailObserv) {
        this.userDetailObservablePrivate.next(dataUserDetail);
    }

    // ------------------------------------------------------

    // // Products
    private productObservablePrivate: BehaviorSubject<ProductObserv> = new BehaviorSubject<ProductObserv>({ productsOfInterface : "" });

    get productObservable() {
        return this.productObservablePrivate.asObservable();
    }

    set productObservableData(dataProduct:ProductObserv) {
        this.productObservablePrivate.next(dataProduct);
    }

    // // ------------------------------------------------------

    // // Product Detail
    private productDetailObservablePrivate: BehaviorSubject<ProductDetailObserv> = new BehaviorSubject<ProductDetailObserv>({ productDetailObserv : "" });

    get productDetailObservable() {
        return this.productDetailObservablePrivate.asObservable();
    }

    set productDetailObservableData(dataProductDetail:ProductDetailObserv) {
        this.productDetailObservablePrivate.next(dataProductDetail);
    }

}