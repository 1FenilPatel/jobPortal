import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    const filteredCompany = allCompanies.filter((company) => {
      if (!searchCompayByText) return true;
      return company?.name
        ?.toLowerCase()
        .includes(searchCompayByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [allCompanies, searchCompayByText]);

  return (
    <div className="overflow-x-auto w-full">
      <Table className="min-w-[600px]">
        <TableHeader>
          <TableRow>
            <TableHead className="text-base sm:text-lg">Logo</TableHead>
            <TableHead className="text-base sm:text-lg">Name</TableHead>
            <TableHead className="text-base sm:text-lg">Date</TableHead>
            <TableHead className="text-base sm:text-lg">Job</TableHead>
            <TableHead className="text-right text-base sm:text-lg">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterCompany.map((company, index) => (
            <TableRow key={index} className="text-sm sm:text-base">
              <TableCell>
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarImage
                    className="object-contain"
                    src={company?.logo}
                    alt={company?.name}
                  />
                </Avatar>
              </TableCell>

              <TableCell>{company?.name}</TableCell>
              <TableCell>{company?.createdAt?.split("T")[0]}</TableCell>

              <TableCell>
                <a href="/admin/job" className="text-blue-600 hover:underline">
                  Post Job
                </a>
              </TableCell>

              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger className="focus:outline-none">
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompanyTable;
