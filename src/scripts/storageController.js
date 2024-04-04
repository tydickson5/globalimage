import { Storage } from '@ionic/storage';

export async function set(key, value, s){
    var store = new Storage();
    store.create();
    await store.set(key, value);

    const sessionStorage = window.sessionStorage;
    sessionStorage.setItem(key, value);
}