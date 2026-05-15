import { colors } from '@/constants/theme';
import * as React from 'react';
import { View } from 'react-native';
import { Button, Divider, Menu } from 'react-native-paper';

const FilterBar = ({FilterPrice,FilterRating,settypeSort}:any) => {
  const [visibleSort, setVisibleSort] = React.useState(false);
  const [visibleFilter, setVisibleFilter] = React.useState(false);

  const openSort = () => setVisibleSort(true);

  const closeSort = () => setVisibleSort(false);
  
  const openFilter = () => setVisibleFilter(true);

  const closeFilter = () => setVisibleFilter(false);

  return (
   
      <View
        style={{
          padding:1,
          flexDirection: 'row',
         borderRadius: 2,
       justifyContent:"space-around",
     
       backgroundColor:colors.secondary
        }}>
        <Menu
       
          visible={visibleSort}
          onDismiss={closeSort}
          anchor={
            
          <Button style={{ backgroundColor:"#ffff", margin:5}}  icon="sort" onPress={openSort}>Sort</Button>
          }>
          <Menu.Item onPress={() => {settypeSort("A-Z")}} title="sort A----Z" />
       <Menu.Item onPress={() => {settypeSort("Z-A")}} title="sort Z----A" />
          <Divider />
           
           <Menu.Item onPress={() => {settypeSort("rating")}} title="sort according rating" />

        </Menu>


         <Menu
          visible={visibleFilter}
          onDismiss={closeFilter}
          anchor={<Button style={{ backgroundColor:"#ffff", margin:5}} icon="filter" onPress={openFilter}>Filter</Button>}>
            <Menu.Item onPress={() => {FilterPrice(null),FilterRating(null)}} title="All" />
          <Menu.Item onPress={() => {FilterPrice(500)}} title="hotels price Under 500$" />
          <Menu.Item onPress={() => {FilterPrice(300)}} title="hotels price Under 300$" />
          <Divider />
    <Menu.Item onPress={() => {FilterRating(5)}} title="hotels 5 Stars" />
        <Menu.Item onPress={() => {FilterRating(4)}} title="hotels 4 Stars" />
            <Menu.Item onPress={() => {FilterRating(3)}} title="hotels 3 Stars" />
                <Menu.Item onPress={() => {FilterRating(2)}} title="hotels 2 Stars" />
                    <Menu.Item onPress={() => {FilterRating(1)}} title="hotels 1 Stars" />
        </Menu>
       
          
         {<Button style={{ backgroundColor:"#ffff", margin:5}} icon="map" onPress={() => {}}>Map</Button>}
         
        
      </View>
   
  );
};

export default FilterBar;
 
