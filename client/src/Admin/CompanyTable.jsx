import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { store } from "@/Redux/store";
import { Edit2, MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CompanyTable = () => {
  const { allCompanies, searchCompayByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(allCompanies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allCompanies.length >= 0 &&
      allCompanies.filter((company) => {
        if (!searchCompayByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompayByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompayByText]);
  return (
    <div>
      <Table>
        {/* <TableCaption>List of your recent registred companies</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl">Logo</TableHead>
            <TableHead className="text-xl">Name</TableHead>
            <TableHead className="text-xl">Date</TableHead>
            <TableHead className="text-xl">Job</TableHead>
            <TableHead className="text-right text-xl">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.map((company, index) => (
            <tr key={index}>
              <TableCell>
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    className="cursor-pointer object-contain"
                    src={company?.logo}
                  />
                </Avatar>
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-blue-600"><a href="/admin/job">Post Job</a></TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${company._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;
