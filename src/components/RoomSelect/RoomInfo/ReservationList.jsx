import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ReservationList = ({ reservations }) => (
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Fra</TableCell>
        <TableCell>Til</TableCell>
        <TableCell>Reservert av</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {reservations.map(reservation => (
        <TableRow key={reservation._id}>
          <TableCell>{reservation.from.format('ddd:HH:mm')}</TableCell>
          <TableCell>{reservation.to.format('ddd:HH:mm')}</TableCell>
          <TableCell>{reservation.reservedBy}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export default ReservationList;
