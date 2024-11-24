
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Noida", "Bangalore", "Gurugram", "Pune", "Mumbai"],
    },
    {
      filterType: "Industry",
      array: ["frontend developer", "backend developer", "fullstackdeveloper"],
    },
  
  ];
  const [selectedValue,setSelectedValue]=useState('');
  const changeHandler=(value)=>{
    setSelectedValue(value);
  }
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
  },[dispatch,selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data,index)=>(
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {
              data.array.map((item,idx)=>{
                const itemId=`id${index}-${idx}`
                return (
                  <div className="flex items-center space-x-2 my-2" key={idx}>
                    <RadioGroupItem value={item} id={itemId}/>
                    <Label htmlFor={itemId}>{item}</Label>
                    </div>
                )
              })
            }
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
