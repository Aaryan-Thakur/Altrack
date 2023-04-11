import * as React from "react";
import { DataTable } from "react-native-paper";
import { View, Text, ScrollView } from "react-native";
import { set } from "date-fns";


const FoodBrowser = () => {
  const [data, setdata] = React.useState([]);
  const [page, setpage] = React.useState(0);



  React.useEffect(() => {
    fetch("http://192.168.0.104:3000/api/data")
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
