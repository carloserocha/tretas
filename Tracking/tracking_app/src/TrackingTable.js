import React from 'react';
import { Table } from 'semantic-ui-react'
import request from 'superagent'

const URI = 'http://192.168.15.70:8000/rastreio/correios'


class TrackingTable extends React.Component {
  constructor(props) {
    super(props)

    // fazer os blocos de alerta
    this.state = {
      done: false,
      items: [],
      levels: [
        {
          'word' : 'saiu',
          'level' : 7
        }
      ]
    }
  }

  // TODO: arrumar essa gambiarra para os resultados
  componentDidMount() {
    request
        .get(`${URI}/OA117280554BR`)
        .then(res => this.setState({items: (JSON.parse(res.text)).results, done: true}))
        .catch(err => console.log(err))
}

  renderTableData() {
    if (this.state.done) {
      return this.state.items.map((element, index) => {
        return (
          <Table.Row>
            <Table.Cell>{element.date} {element.hour}</Table.Cell>
            <Table.Cell>{element.local}</Table.Cell>
            <Table.Cell>
              {element.notice}
            </Table.Cell>
          </Table.Row>
        )
      })
    }
  }

  render() {
    if (!this.state.done) {
      return (
        <div>
          Loading...
        </div>
      )
    } else {
      return (
        <Table padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Hora</Table.HeaderCell>
              <Table.HeaderCell>Local</Table.HeaderCell>
              <Table.HeaderCell>Observação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
  
          <Table.Body>
            {this.renderTableData()}
          </Table.Body>
        </Table>
      )
    }
  }
}

export default TrackingTable;
