import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const Home = () => {

    var exchangeStrategyOptions = [
        "LEAST_AMOUNT_OF_COINS",
        "MOST_AMOUNT_OF_COINS",
    ];

    const [errorMessage, setErrorMessage] = useState("");
    const [exchange, setExchange] = useState({
        exchangeAmount: 0,
        exchangeStrategy: exchangeStrategyOptions[0]
    });

    const [exchangedCoins, setExchangedCoins] = useState({
        COIN_1: 0,
        COIN_5: 0,
        COIN_10: 0,
        COIN_25: 0,
    });

    const postExchange = async () => {
        var res = await fetch('http://localhost:8080/exchangeAmount', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(exchange),
        });

        if (res.ok) {
            var data = await res.json();
            if (data != null && data != '') {
                setExchangedCoins(data.exchangedCoins);
            }
        } else {

            var text = await res.text();
            setErrorMessage(text);
        }
    };

    const onClickExchange = () => {
        postExchange();
    }

    const onClickCloseError = () => {
        setErrorMessage("");
    }

    const onChangeAmount = (_event) => {
        setExchange({ ...exchange, exchangeAmount: _event.target.value });
    }

    const onChangeStrategy = (_event) => {
        var selectedStrategyName = _event.target.value;
        setExchange({ ...exchange, exchangeStrategy: selectedStrategyName});
    }

    return (
        <div className='main-page'>

            <div className='form'>
                <div className='mb-3 row'>
                    <label htmlFor='input-amount' className='col-sm-2 col-form-label'>Exchange Amount</label>
                    <div className='col-sm-10'>
                        <input type='text' className='form-control' id='input-amount' value={exchange.exchangeAmount} onChange={(_event) => onChangeAmount(_event)} />
                    </div>
                </div>

                <div className='mb-3 row'>
                    <label htmlFor='input-strategy' className='col-sm-2 col-form-label'>Exchange Strategy</label>
                    <div className='col-sm-10'>
                        <select value={exchange.exchangeStrategy} className="form-select" onChange={(_event) => onChangeStrategy(_event)} >
                            {exchangeStrategyOptions.map((strategy) => (
                                <option key={strategy}>{strategy}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button onClick={() => onClickExchange()} className='col-sm-12 btn btn-secondary btn-success'>Exchange</button>
            </div >

            <table className='table'>
                <thead>
                    <tr>
                        <th colSpan={3}>Coins Received</th>
                    </tr>
                    <tr>
                        <th scope='col'>Coin Type</th>
                        <th scope='col'>Count</th>
                        <th scope='col'>Amount</th>
                    </tr>
                </thead>

                <tbody>
                    <tr key='1' >
                        <th>1</th>
                        <td>{exchangedCoins.COIN_1}</td>
                        <td>R${(exchangedCoins.COIN_1 * 1) / 100}</td>
                    </tr>

                    <tr key='5' >
                        <th>5</th>
                        <td>{exchangedCoins.COIN_5}</td>
                        <td>R${(exchangedCoins.COIN_5 * 5)  / 100}</td>
                    </tr>

                    <tr key='10' >
                        <th>10</th>
                        <td>{exchangedCoins.COIN_10}</td>
                        <td>R${(exchangedCoins.COIN_10 * 10)  / 100}</td>
                    </tr>

                    <tr key='25' >
                        <th>25</th>
                        <td>{exchangedCoins.COIN_25}</td>
                        <td>R${(exchangedCoins.COIN_25 * 25)  / 100}</td>
                    </tr>

                </tbody>
            </table>

            {errorMessage !== "" &&
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                    <div style={{ float: 'right' }}>
                        <FaTimes className='close' onClick={() => onClickCloseError()} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Home
