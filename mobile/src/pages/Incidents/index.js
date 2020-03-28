import React, {useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import { View, Image, Text, FlatList, TouchableOpacity, ViewComponent } from 'react-native';
import api from '../../services/api.js';

import Logoimg from '../../assets/logo.png';
import styles from './styles';
import Detail from '../Detail';

export default function Incidents () {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();
    // criando as rotas de navegação
    function navigateTodetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){

        if(loading) {
            return;
        }

        if(total>0 && incidents.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {
                page,
            }
        });

        // puxando as informaçoes da pag incidents e os dados e anexando dois vetores
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(true);

    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style= {styles.header}>
                <Image source={Logoimg} />
                <Text style={styles.headerText}>
                    Total de <Text  style={styles.headerTextBold}>{total} casos </Text>
                </Text>
            </View>


            <Text style={styles.title}>Bem vindo</Text>
            <Text style={styles.description}>Escolha um caso abaixo e salve o dia</Text>


            {/* fazendo scroll */}
            <FlatList 
                data={incidents}
                style={styles.incidentList}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator ={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.3}
                // trocando nome da varialvel item que é mesma coisa de incident para nao confundir
                renderItem={ ({ item: incident }) => (
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{
                            Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'})
                            .format(incident.value)}
                        </Text>
                    
                    <TouchableOpacity 
                        style={styles.detailsButton} 
                        onPress={() => navigateTodetail(incident)}
                    >
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041" />
                    </TouchableOpacity>
                    
                </View>
                ) }
            />
         
        </View>
    );
}