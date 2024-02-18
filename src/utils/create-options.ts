interface createOptionsParams {
  arr: any[];
  value?: string;
  label?: string;
}

export const createOptions = ({
  arr,
  value = "id",
  label = "name",
}: createOptionsParams) => {
  return arr?.map((d) => ({
    value: d[value],
    label: d[label],
  }));
};
