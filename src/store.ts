import {makeAutoObservable} from "mobx";
import React from "react";

export interface Coin {
    name: string;
    tickerId: NodeJS.Timeout;
    id: string;
    logoUrl: string;
    price: string;
}

export interface CoinData {
    name: string;
    logoUrl: string;
    price: string;
    id:string;
}

class MainStore {
    newCoinName: string = '';
    coins: Coin[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    changeCoinName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.newCoinName = e.target.value
    };

    addCoin = async () => {
        if (this.coins.every((coin) => {
            return coin.id !== this.newCoinName;
        })) {
            const coinData = await this.fetchCoin(this.newCoinName);
            const tickerId = this.createTicker(this.newCoinName);
            this.coins.push({
                ...coinData,
                tickerId,
            })
        }
    };

    fetchCoin(id: string) {
        return fetch(`https://api.nomics.com/v1/currencies/ticker?key=d18e5da25e8bdea97f3b24761b6348aa&ids=${id}&interval=1s,&convert=EUR&per-page=100&page=1`)
            .then(this.fetchCoinSuccess)
    }

    async fetchCoinSuccess(res: any): Promise<CoinData> {
        const parsedRes = await res.json();
        const coin = parsedRes[0];
        return {
            name: coin.name,
            id: coin.id,
            logoUrl: coin.logo_url,
            price: coin.price,
        }
    }

    createTicker(id: string) {
        return setInterval(async () => {
            const updatedCoin = await this.fetchCoin(id);
            const currentCoin = this.coins.find((coin) => {
                return coin.id === id;
            });
            if (currentCoin) {
                currentCoin.price = updatedCoin.price;
            }
        }, 10000)
    }

    deleteCoin = (id: string) => {
        const coin = this.coins.find((coin) => {
            return coin.id === id;
        });
        if (coin)
            clearInterval(coin.tickerId);
        this.coins = this.coins.filter(coin => coin.id !== id)
    }
}

export const store = new MainStore();