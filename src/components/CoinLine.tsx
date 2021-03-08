import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Coin, CoinData, store} from "../store";

const ImageCoin = styled.img`
   height: 80px;
   width: 100px;
`;

const CoinLineS = styled.div`
    height: 80px;
    display: flex;
    width: 100%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    `;
const DeleteCoin = styled.button`
   height: 80px;
   width: 100px;
   border: 1px solid red;
   cursor: pointer;
    &:hover {
    background: red;
   }
`;

export const CoinLine = (props: CoinData) => {

    return <CoinLineS>
        <ImageCoin
            src={props.logoUrl}
        />
        {props.name}
        {props.price}
        <DeleteCoin
            onClick={() => store.deleteCoin(props.id)}

        >
            Delete
        </DeleteCoin>
    </CoinLineS>
};