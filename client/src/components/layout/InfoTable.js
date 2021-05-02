import React, { useState, useEffect }  from 'react';
import { Table } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import faker from 'faker'
import '../styles/home.css'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '$ Raised',
    dataIndex: 'amountRaised',
    key: 'amountRaised',
  },
  {
    title: '',
    dataIndex: 'visitPage',
    key: 'visitPage',
    render: text => <a href={text} target="_blank" rel="noreferrer" > <FontAwesomeIcon icon={faSearch} /></a>
  },
  {
    title: '',
    dataIndex: 'donatePage',
    key: 'donatePage',
    render: data => <Link to={{ pathname: '/donate', props: data}} s> <FontAwesomeIcon icon={faHandHoldingUsd} /></Link>
  },
];

export const InfoTable = () => {
  const [responseData, setResponseData ] = useState()
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get('https://data.gov.au/data/api/3/action/datastore_search?resource_id=eb1e6be4-5b13-4feb-b28e-388bf7c26f93&limit=5')
      const mappedData = await data.result.records.map((charity, index)=> {
        let website
        if( charity.Charity_Website ) {
          if( charity.Charity_Website.startsWith('http://') || charity.Charity_Website.startsWith('https://') ) {
            website = charity.Charity_Website
          } else {
            website = `http://${charity.Charity_Website}`
          }
        }
        const obj = {
          key: index+1,
          name: charity.Charity_Legal_Name,
          amountRaised: faker.commerce.price(20, 50000, 2, '$ '),
          visitPage: website,
          donatePage: charity.Charity_Legal_Name
        }
        return obj
      })
      setResponseData(mappedData)
    };
    getData();

  }, [])

  return (
    <Table dataSource={responseData} columns={columns} />
  )
}