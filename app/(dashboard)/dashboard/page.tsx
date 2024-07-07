import { cookies } from "next/headers"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { inforList } from "../constants/dashboard";
import InforSheet from "../components/InforSheet";


let cookieStore = cookies () ; 
const sessionToken = cookieStore.get('clientToken')  ;

const DashBoard = () => {

  return (
      <>
  <Card>
      <CardHeader className="px-7">
          <CardTitle>Thông tin</CardTitle>
      </CardHeader>
  </Card>
  <CardContent>
      <Table>
      <TableBody>
        <InforSheet token= {sessionToken?.value} />

      </TableBody>
      </Table>
  </CardContent>
  </>
  )
}

export default DashBoard;