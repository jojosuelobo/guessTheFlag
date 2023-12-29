import './Ranking.sass'
import image from '../../images/default.png'

// Radix
import { Button, Table } from '@radix-ui/themes'

// Router
import { useNavigate } from 'react-router-dom'

// Axios
import axios from 'axios'

// React
import { useEffect, useState } from 'react'

import { orderBy } from 'lodash';

type Props = {}

interface RankingItem {
    id: string
    username: string;
    points: string;
}

export default function Ranking({ }: Props) {
    const navigate = useNavigate()

    const [rankingData, setRankingData] = useState<RankingItem[]>([]);

    useEffect(() => {
        const fetchRankingData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/ranking');
                const sortedApiResponse = orderBy(response.data, ['points'], ['desc']);
                setRankingData(sortedApiResponse);
            } catch (error) {
                console.error('Erro ao buscar dados do ranking:', error);
            }
        };
        fetchRankingData();
    }, []);

    return (
        <div className='context'>
            <Button
                size="4"
                radius="full"
                className='btn rankButton'
                onClick={() => navigate('/')}
            >Voltar</Button>

            <div className='ranking'>
                <div className='rank'>
                    <Table.Root variant="surface" size="3" className='tableRoot'>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell width="20px" >Rank</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell width="20px">Username</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell width="20px">Pontuação</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell justify="end"></Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body className='body'>
                            {rankingData.map((item, index) => (
                                <Table.Row className='row' key={item.id}>
                                    <Table.RowHeaderCell>#{index + 1}</Table.RowHeaderCell>
                                    <Table.Cell className='cell'>{item.username}</Table.Cell>
                                    <Table.Cell>{item.points}</Table.Cell>
                                    <Table.Cell justify="end">
                                        <img src={image} alt="pic" />
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </div>
            </div>
        </div>
    )
}