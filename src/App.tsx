import React, {useState} from 'react';
import {Button} from "./components/button";
import styled from "styled-components";
import {CoinLine} from "./components/CoinLine";
import {store} from "./store";
import {observer} from "mobx-react-lite";

const CoinList = styled.div`
    display: flex;
    flex-direction: column;
`;

const CoinNameEnterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InputCoin = styled.input`
    height: 80px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid black;
    `;

export const ButtonCoin = styled.button`
    height: 40px;
    width: 40px;
    border-radius: 5px;
    border: 1px solid blue;
`;
export const App = observer(() => {
        return <div>
            <CoinNameEnterContainer>
                <InputCoin
                    value={store.newCoinName}
                    onChange={store.changeCoinName}

                />
                <Button
                    title={'click'}
                    onClick={store.addCoin}
                />
            </CoinNameEnterContainer>
            <CoinList>
                {
                    store.coins.map(coin => {
                        return <CoinLine
                            id={coin.id}
                            name={coin.name}
                            key={coin.id}
                            price={coin.price}
                            logoUrl={coin.logoUrl}
                        />
                    }).reverse()
                }
            </CoinList>
        </div>
    }
);