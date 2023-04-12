import * as React from "react";
import { DataTable } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import { set } from "date-fns";
import { useSelector } from "react-redux";

const FoodBrowser = () => {
  const [data, setdata] = React.useState([]);
  const [page, setpage] = React.useState(0);

  const URL = useSelector(state => state.url.URL);



  React.useEffect(() => {
    fetch(`${URL}/api/data`)
      .then((response) => response.json())
      .then((data) => {
        setdata(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [page]);

  return (
    <DataTable>
        <DataTable.Pagination
          numberOfItemsPerPage={10}
          showFastPaginationControls
        />
      <DataTable.Header>
        <DataTable.Title>Name</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {data.map((item) => (
          <DataTable.Row key={item.id}>
            <DataTable.Cell>{item.food}</DataTable.Cell>
            <DataTable.Cell numeric>{item.calper100}</DataTable.Cell>
          </DataTable.Row>
        ))}

</ScrollView>


    </DataTable>
  );
};

export default FoodBrowser;
