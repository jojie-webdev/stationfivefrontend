import { useEffect, useState } from "react";
import { getMenuItems, GetMenuItemsResponse } from "../../services/menu";
import {
  CreateOrderPrivateProps,
  CreateOrderPublicProps,
} from "./CreateOrder.props";
import CreateOrderView from "./CreateOrder.view";

const CreateOrder = (props: CreateOrderPublicProps) => {

  const [menuItems, setMenuItems] = useState<GetMenuItemsResponse>();
  
  useEffect(() => {
    // TODO: Fetch menu data
    const fetchData = async () => {
      return await getMenuItems()};

    // comment this when running the app
    fetchData();

    // uncommenting this for testing the application in the browser only not for unit testing
    // fetchData().then((res: GetMenuItemsResponse) => {
    //   setMenuItems(res);
    // });

  }, []);

  const generatedProps: CreateOrderPrivateProps = {
    items: menuItems ?  [...menuItems?.items] : [],
    rules: menuItems ? {...menuItems.rules} : {},
  };

  return <CreateOrderView {...generatedProps} />;
};

export default CreateOrder;
