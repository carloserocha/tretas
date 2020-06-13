import React from 'react';
import { Form, Grid } from 'semantic-ui-react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import request from 'superagent';

const URI = 'http://localhost:8000/rastreio/correios'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class CustomizedTables extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tracking_code: '',
      rows: []
    }
    this.classes = makeStyles({
      table: {
        minWidth: 1000,
      },
    });
  }

  getEvents() {
    return this.state.rows.map((row) => {
      return (
        <StyledTableRow key={row.notice}>
          <StyledTableCell component="th" scope="row">
            {row.date} {row.hour}
          </StyledTableCell>
          <StyledTableCell align="right">{row.local}</StyledTableCell>
          <StyledTableCell align="left">{row.notice}</StyledTableCell>
        </StyledTableRow>
      )
    })
  }

  myChangeHandler = (event) => {
    this.setState({ tracking_code: event.target.value });
    if (event.target.value.length > 10) {
      request
        .get(`${URI}/${event.target.value}`)
        .then(res => this.setState({rows: (JSON.parse(res.text).results)}))
        .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <Grid centered columns={1}>
        <Grid.Column>
          <Form onSubmit={this.mySubmitHandler} padded>
            <Form.Group>
              <Form.Input
                placeholder='Insire o código de rastreio'
                type='text'
                value={this.state.tracking_code}
                onChange={this.myChangeHandler}
              />
            </Form.Group>
          </Form>
        </Grid.Column>
        <Grid.Column>
          <TableContainer component={Paper}>
            <Table className={this.classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Data / Hora</StyledTableCell>
                  <StyledTableCell align="left">Local</StyledTableCell>
                  <StyledTableCell align="left">Evento</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.getEvents()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid.Column>
      </Grid>
    );
  }
}


export default CustomizedTables