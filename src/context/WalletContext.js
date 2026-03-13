import React, { createContext, useState, useContext, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
    const [balance, setBalance] = useState(254029.76);
    const [transactions, setTransactions] = useState([
        {
            id: '1',
            type: 'Buy',
            asset: 'Bitcoin',
            symbol: 'BTC',
            amount: '0.005 BTC',
            value: '$312.50',
            date: 'Feb 15, 2026',
            status: 'Completed',
            icon: '₿',
        },
        {
            id: '2',
            type: 'Send',
            asset: 'Ethereum',
            symbol: 'ETH',
            amount: '0.5 ETH',
            value: '$1,250.00',
            date: 'Feb 12, 2026',
            status: 'Completed',
            icon: 'Ξ',
        },
        {
            id: '3',
            type: 'Stake',
            asset: 'Solana',
            symbol: 'SOL',
            amount: '10 SOL',
            value: '$1,100.00',
            date: 'Feb 10, 2026',
            status: 'Active',
            icon: 'S',
        },
        {
            id: '4',
            type: 'Receive',
            asset: 'Cardano',
            symbol: 'ADA',
            amount: '500 ADA',
            value: '$250.00',
            date: 'Feb 08, 2026',
            status: 'Completed',
            icon: '₳',
        },
    ]);

    const [stakedAssets, setStakedAssets] = useState([
        {
            id: '1',
            asset: 'Solana',
            symbol: 'SOL',
            amount: '10 SOL',
            apy: '6.5%',
            rewards: '0.12 SOL',
            lockup: 'None',
        }
    ]);

    const addTransaction = (transaction) => {
        setTransactions([
            {
                id: Math.random().toString(36).substr(2, 9),
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                status: 'Completed',
                ...transaction
            },
            ...transactions
        ]);
    };

    const updateBalance = (amount) => {
        setBalance(prev => prev + amount);
    };

    const addStakedAsset = (asset) => {
        setStakedAssets([...stakedAssets, { id: Math.random().toString(36).substr(2, 9), ...asset }]);
    };

    return (
        <WalletContext.Provider value={{ 
            balance, 
            transactions, 
            stakedAssets,
            addTransaction, 
            updateBalance,
            addStakedAsset
        }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => useContext(WalletContext);
