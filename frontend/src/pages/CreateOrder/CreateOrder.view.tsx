import React, { useMemo, useReducer } from "react";
import "./CreateOrder.css";
import RadioInput from "../../components/RadioInput";
import { CreateOrderProps } from "./CreateOrder.props";

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props;

  type SelectedItems = Record<number, string>;
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => {
      // TODO: Merge selectedItems state with newState
      return {...state, ...newState};
    },
    {
      0: "",
      1: "",
      2: "",
    } as SelectedItems
  );

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex];
  };

  const blacklist: number[] = useMemo(() => {
    // TODO: Create a blacklist based on rules and currently selected items
    const newArray = items.flatMap(item => item);
    let blackListedItems: number[] = [];

    for (const [key, value] of Object.entries(selectedItems)) {
      const foundItem = newArray.find(item => item.value === value)
      if (foundItem !== undefined && foundItem?.id in rules === true) {
        blackListedItems.push(...rules[parseInt(foundItem?.id)])
      }

    }

    return blackListedItems;
  }, [rules, selectedItems, items]);

  const isDisabled = (id: string) => { 
    return blacklist.includes(+id);
  };

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedItems);
  };

  // TODO: If no items are available, show a "Loading..." text
  return (
    <div className="createOrder">
      <form onSubmit={handleSubmit}>
        {items.length === 0 &&  <span className="loading">Loading...</span>}
        <br />
        {items.map((group, groupIndex) => {
          return (
            <div className="groupList" key={ Math.random().toString(36).substring(2, 9) }>
              {group.map((item) => {
                // TODO: Should render RadioInput component
                return (
                  <div key={ Math.random().toString(36).substring(2, 9) }>
                    <RadioInput 
                        label=""
                        value={item.value}
                        checked = {isSelected(item.value, groupIndex)}
                        onSelect={(value) => handleSelection(value, groupIndex)}
                        disabled= {isDisabled(item.id)}
                      />
                  </div>
  
                )
              })}
              <br />
            </div>
          );
        })}
        <input className="btn" type="submit" />
      </form>
    </div>
  );
};

export default CreateOrderView;
