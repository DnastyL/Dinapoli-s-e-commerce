export const ProductAbout = ({
  aboutValues,
  aboutTopics,
}: {
  aboutValues: (string | string[])[];
  aboutTopics: string[];
}) => {
  return (
    <table className="w-full max-w-[500px]">
      <tbody>
        {aboutValues.map((value, i) => (
          <tr key={i} className="flex justify-between items-center my-1">
            <td className="font-semibold text-sm text-black">
              {aboutTopics[i]}
            </td>
            <td className="text-sm text-black text-ellipsis min-w-0 max-w-[215px] overflow-hidden whitespace-nowrap">
              {value.toString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
