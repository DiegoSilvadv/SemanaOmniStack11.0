import React, {useState} from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import {Link, useHistory } from 'react-router-dom';
import './styles.css';
import logoimg from '../../assets/logo.svg';
import api from '../../Services/api.js';


export default function Register() {
    // criando um estado para pegar os valores dos inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsApp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    const history = useHistory();

    async function handleRegister (e) {
        e.preventDefault();
        const data = {
            name, 
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('/ongs', data);
            alert(`Seu id de acesso: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('erro no cadastro tente novamente');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas encontrarem os casos de sua ONG. </p>
                    
                    <Link className="back-link" to = "/register">
                        <FiArrowLeft size = {16} color = "#e02041" />
                        Não tenho cadastro
                    </Link>
                </section>
                
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value = {name} 
                        onChange= {e => setName(e.target.value)}             
                    />
                    <input 
                        placeholder="E-mail"
                        value = {email}
                        onChange= {e => setEmail(e.target.value)}
                    />
                    <input 
                        placeholder="WhatsApp"
                        value = {whatsapp}
                        onChange= {e => setWhatsApp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value = {city}
                            onChange= {e => setCity(e.target.value)}
                        />
                        <input 
                            placeholder="UF"
                            style={{width: 80}}
                            value = {uf}
                            onChange= {e => setUF(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}