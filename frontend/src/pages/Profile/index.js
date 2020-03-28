import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../Services/api';
import logoimg from '../../assets/logo.svg';
import './styles.css';


export default function Profile(){

    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(Response=> {
                setIncidents(Response.data);
        })
    }, [ongId]);


   async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers:{
                    Authorization: ongId,
                }
            });

        setIncidents(incidents.filter(incident => incident.id !== id ));
        } catch (error) {
            alert('erro ao deletar caso tente novamente');
        }
    }

    async function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoimg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName} </span>

                <Link className="button" to="/incident/new">Cadastrar novo caso </Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos Listados</h1>
            <ul>
                {incidents.map(incidents => (
                    <li key={incidents.id}>
                    <strong>Caso:</strong>
                    <p>{incidents.title}</p>

                    <strong>Descrição</strong>
                    <p>{incidents.description}</p>

                    <strong>Valor</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incidents.value)}</p>

                    <button onClick={() => handleDeleteIncident(incidents.id)} type="button">
                        <FiTrash2 size={20} color= "#a8a8b3" />
                    </button>
                </li>                
                ))}               
            </ul>
        </div>
    )
}