import { TextInput } from "@mantine/core";
import { FC } from "react";
import useStore from "../../state/store";
import { useShallow } from "zustand/react/shallow";

const SearchBox: FC = () => {
  const [
    searchTerm,
    setSearchTerm
  ] = useStore(useShallow(state => [
    state.searchTerm,
    state.setSearchTerm
  ]));

  return (
    <TextInput
      size="md"
      miw={350}
      placeholder="Search a Block Number"
      autoFocus
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  )
}

export default SearchBox;