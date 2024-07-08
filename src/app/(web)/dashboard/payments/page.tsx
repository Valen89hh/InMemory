"use client"

import { useAuthStore } from "@/lib/storage/auth-storage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from "@mui/material";
import { useEffect, useState, useTransition } from "react";
import { BiographyPayment } from "@/lib/models/biography-model";
import { db, getPaymentsByUser } from "@/lib/firebase";
import toast from "react-hot-toast";
import ErrorToast from "@/components/toast/error-toast";
import { formatDate } from "@/utils/formater-date";
import StatusBiography from "@/components/badgest/status-biography";
import { collection, onSnapshot } from "firebase/firestore";
import Card from "@/components/cards/card";
import SuccessToast from "@/components/toast/sucess-toast";

const PaymentsDashboardPage = () => {
    const { user } = useAuthStore();
    const [payments, setPayments] = useState<BiographyPayment[]>([]);
    const [tableLoading, startTableLoading] = useTransition();
    const [notifyPay, setNotifyPay] = useState("")

    useEffect(()=>{
        if(notifyPay !== ""){
            toast.custom((t)=><SuccessToast t={t} msg={notifyPay}/>);
        }
    }, [notifyPay])

    useEffect(() => {
        const paymentsRef = collection(db, 'payments');

        const unsubscribe = onSnapshot(paymentsRef, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const payment = change.doc.data() as BiographyPayment;
                switch (change.type) {
                    case 'added':
                        break;
                    case 'modified':
                        setPayments((prevPayments) =>
                            prevPayments.map((p) => {
                                if (p.id === change.doc.id) {
                                    setNotifyPay(`La Biografía "${payment.name}" se a ${payment.status}`)
                                    return { ...payment, id: change.doc.id, createAt: change.doc.data().createAt.toDate() };
                                } else {
                                    return p;
                                }
                            })
                        );
                        break;
                    case 'removed':
                        break;
                    default:
                        break;
                }
            });
        });

        if (user) {
            startTableLoading(async () => {
                const res = await getPaymentsByUser(user?.uid ?? "");
                if (res.success && res.payments) {
                    setPayments(res.payments);
                } else if (res.error) {
                    toast.custom((t) => <ErrorToast t={t} msg={res.error} />);
                }
            });
        }

        return () => unsubscribe();
    }, [user]);

    return (
        <Card>
            <h3 className="text-primary text-3xl mb-[2rem] text-center">Mis Pagos</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Biografía</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right">Amount (S/.)</TableCell>
                            <TableCell align="right">Codigo De Envio</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payments.map((pay) => (
                            <TableRow key={pay.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{pay.name}</TableCell>
                                <TableCell align="right">{formatDate(pay.createAt)}</TableCell>
                                <TableCell align="right">{pay.amount}</TableCell>
                                <TableCell align="right">{!pay.codigo ? "----" : pay.codigo}</TableCell>
                                <TableCell align="right"><StatusBiography status={pay.status} /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {tableLoading && (
                <div className="flex justify-center items-center w-full">
                    <CircularProgress className="mt-5 mx-auto w-fit" color="primary" />
                </div>
            )}
        </Card>
    );
}

export default PaymentsDashboardPage;
