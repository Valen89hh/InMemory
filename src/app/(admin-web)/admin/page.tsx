"use client"

import { useAuthStore } from "@/lib/storage/auth-storage";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { startTransition, useEffect, useState, useTransition } from "react";
import { BiographyPayment } from "@/lib/models/biography-model";
import { db, getAllPayments } from "@/lib/firebase";
import toast from "react-hot-toast";
import ErrorToast from "@/components/toast/error-toast";
import { formatDate } from "@/utils/formater-date";
import StatusBiography from "@/components/badgest/status-biography";
import SettingIcon from "@/components/icons/setting-icon";
import { collection, onSnapshot } from "firebase/firestore";
import Link from "next/link";






const AdminPage = () => {
    const [payments, setPayments] = useState<BiographyPayment[]>([])
    const [tableLoading, startTableLoading] = useTransition()

    useEffect(()=>{
        const paymentsRef = collection(db, "payments")
  
        const unsubscribe = onSnapshot(paymentsRef, (snapshot) => {
            const newsPayments: BiographyPayment[] = []
            snapshot.docChanges().forEach((change) => {
              if (change.type === 'added') {
                console.log("Pago añadigo")
                const pay = {
                    ...change.doc.data(),
                    createAt: change.doc.data().createAt.toDate(),
                    id: change.doc.id
                } as BiographyPayment
                newsPayments.push(pay)
              }
            });
            setPayments((pays)=>[...pays, ...newsPayments])
          });

        startTableLoading(async()=>{
            console.log("Cargando")
            const res = await getAllPayments()
            
            if(res.success && res.payments){
                setPayments(res.payments)
            }else if(res.error){
                toast.custom((t)=><ErrorToast t={t} msg={res.error}/>)
            }
        })

        return ()=> unsubscribe()
    }, [])

    

    return (
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Biograf&iacute;a</TableCell>
                        <TableCell align="right">Usuario</TableCell>
                        <TableCell align="right">Bio Id</TableCell>
                        <TableCell align="right">Fecha</TableCell>
                        <TableCell align="right">Amount (S/.)</TableCell>
                        <TableCell align="right">Codigo</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Procesar</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {payments.map((pay) => (
                        <TableRow
                        key={pay.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {pay.name}
                            </TableCell>
                            <TableCell align="right">{pay.userId}</TableCell>
                            <TableCell align="right">{pay.bioId}</TableCell>
                            <TableCell align="right">{formatDate(pay.createAt)}</TableCell>
                            <TableCell align="right">{pay.amount}</TableCell>
                            <TableCell align="right">{!pay.codigo ? "----" : pay.codigo}</TableCell>
                            <TableCell align="right">
                                <StatusBiography status={pay.status}/>
                            </TableCell>
                            <TableCell align="right">
                                <Link href={"/admin/payment/"+pay.id}>
                                    <SettingIcon color="#003F5F" width={18} height={18}/>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                    {tableLoading && (
                        <div className="flex justify-center items-center w-full">
                            <CircularProgress className="mt-5 mx-auto w-fit" color="primary"/>
                        </div>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            
     );
}
 
export default AdminPage;