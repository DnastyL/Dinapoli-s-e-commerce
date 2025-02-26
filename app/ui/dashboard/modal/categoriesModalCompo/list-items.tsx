import { useDashboard } from "@/app/hooks/useContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "react-feather";

type ListItemProps = {
  handleAxis: (axis: number) => void;
  category: string;
  items: string[];
};

export const ListItem = ({ handleAxis, category, items }: ListItemProps) => {
  const { replace } = useRouter();
  const { handleModal } = useDashboard();
  const searchParams = useSearchParams();

  const setQuery = (item: string) => {
    const query = item.toLocaleLowerCase();
    const params = new URLSearchParams(searchParams);
    params.set("query", query);
    params.set("categories", category);

    replace(`/search-results?${params.toString()}`);
  };

  return (
    <div className="w-[384px] relative">
      <div className="h-11 pt-2 border-b border-blue-gray-100">
        <a
          aria-label="Open Eletronic Category"
          className="group h-full pl-8 hover:bg-blue-gray-100/50 hover:cursor-pointer flex items-center"
          onClick={() => handleAxis(0)}
        >
          <ArrowLeft className="group-hover:text-black text-gray" size={22} />
          <h2 className="text-black-medium ml-2 font-bold text-sm">
            MAIN MENU
          </h2>
        </a>
      </div>
      <div className="flex flex-col gap-2 justify-around py-3">
        <h2 className="text-black-medium ml-8 font-bold text-lg">{category}</h2>

        {items.map((item) => (
          <a
            key={item}
            className="group pl-8 h-8 hover:bg-blue-gray-100/50 hover:cursor-pointer flex items-center"
            onClick={() => {setQuery(item), handleModal(false, false)}}
          >
            <p className="text-black-medium w-[85%] text-sm">{item}</p>
          </a>
        ))}
      </div>
    </div>
  );
};
