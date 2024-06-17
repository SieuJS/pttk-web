
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
import { InforProps } from "../constants/dashboard";

interface CompanyInfo {
  mst: string;
  tencongty: string;
  nguoidaidien: string;
  diachi: string;
  email: string;
}

const fakeCompany: CompanyInfo = {
  mst: "123",
  tencongty: "FPT",
  nguoidaidien: "Jason",
  diachi: "HCM",
  email: "test@test.com"
};

const DashBoard = () => {
  return (
      <>
  <Card>
      <CardHeader className="px-7">
          <CardTitle>Thông tin công ty thành viên</CardTitle>
      </CardHeader>
  </Card>
  <CardContent>
      <Table>
      <TableBody>
          {inforList.map(i => (
            <TableRow>
              <TableCell>
                <div className="font-medium">{i.label}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{(fakeCompany as any)[i.value]}</div>
              </TableCell>
            </TableRow>
          ))}

          
      </TableBody>
      </Table>
  </CardContent>
  </>
  )
}

export default DashBoard;