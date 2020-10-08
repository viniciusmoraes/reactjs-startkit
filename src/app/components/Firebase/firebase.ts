import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        /* Helper */
        // @ts-ignore
        this.serverValue = app.database.ServerValue;
        // @ts-ignore
        this.emailAuthProvider = app.auth.EmailAuthProvider;

        /* Firebase APIs */
        // @ts-ignore
        this.auth = app.auth();
        // @ts-ignore
        this.db = app.database();
        // @ts-ignore
        this.dbStore = app.firestore();

        /* Social Sign In Method Provider */
        // @ts-ignore
        this.googleProvider = new app.auth.GoogleAuthProvider();
        // @ts-ignore
        this.facebookProvider = new app.auth.FacebookAuthProvider();
        // @ts-ignore
        this.twitterProvider = new app.auth.TwitterAuthProvider();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email: any, password: any) =>
        // @ts-ignore
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email: any, password: any) =>
        // @ts-ignore
        this.auth.signInWithEmailAndPassword(email, password);

    doSignInWithGoogle = () =>
        // @ts-ignore
      this.auth.signInWithPopup(this.googleProvider);

    doSignInWithFacebook = () =>
        // @ts-ignore
      this.auth.signInWithPopup(this.facebookProvider);

    doSignInWithTwitter = () =>
        // @ts-ignore
      this.auth.signInWithPopup(this.twitterProvider);

    doSignOut = () =>
        // @ts-ignore
        this.auth.signOut();

    doPasswordReset = (email: any) =>
        // @ts-ignore
        this.auth.sendPasswordResetEmail(email);

    doSendEmailVerification = () =>
        // @ts-ignore
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });

    doPasswordUpdate = (password: any) =>
        // @ts-ignore
        this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next: any, fallback: any) =>
        // @ts-ignore
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then((snapshot: any) => {
                        const dbUser = snapshot.val();
                        //console.log(snapshot, dbUser)

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            emailVerified: authUser.emailVerified,
                            providerData: authUser.providerData,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = (uid: any) =>
        // @ts-ignore
        this.db.ref(`users/${uid}`);

    users = () =>
        // @ts-ignore
        this.db.ref('users');

    // *** Message API ***

    message = (uid: any) =>
        // @ts-ignore
        this.db.ref(`messages/${uid}`);

    messages = () =>
        // @ts-ignore
        this.db.ref('messages');

    setDocument = (collection: any, data: any) =>
        // @ts-ignore
        this.dbStore
            .collection(collection)
            .doc(data.did.toString())
            .set(data)

    queryDocument = (collection: any, key: any, operador: any, value: any) => {
        // @ts-ignore
        const _dbStore = this.dbStore;
        return new Promise(function(resolve, reject){
            // @ts-ignore
            _dbStore
                .collection(collection)
                .where(key, operador, value).get()
                .then((snapshot: any) => {
                    if (snapshot.empty) {
                        resolve(false);
                        return;
                    }

                    resolve(true);
                    // snapshot.forEach((doc: any) => {
                    //     console.log(doc.id, '=>', doc.data());
                    // });
                })
                .catch((err: any) => {
                    reject(err);
                });
        });

    }

    updateDocument = (collection: any, key: any, operador: any, id: any, value: any) => {
        // @ts-ignore
        const _dbStore = this.dbStore;
        return new Promise(function(resolve, reject){
            // @ts-ignore
            _dbStore
                .collection(collection)
                .doc(id.toString())
                .update(value)
                .then((snapshot: any) => {
                    if (snapshot !== undefined) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                })
                .catch((err: any) => {
                    reject(err);
                });
        });

    }

    getDocument = (collection: any, key: any, operador: any, value: any) => {
        // @ts-ignore
        const _dbStore = this.dbStore;
        return new Promise(function(resolve, reject){
            // @ts-ignore
            _dbStore
                .collection(collection)
                .where(key, operador, value).get()
                .then((snapshot: any) => {
                    if (snapshot.empty) {
                        resolve(false);
                        return;
                    }

                    snapshot.forEach((doc: any) => {
                        resolve(doc.data());
                    });

                })
                .catch((err: any) => {
                    reject(err);
                });
        });

    }

}

export default Firebase;
