const idGenerator = () => {
  return Math.random().toString().substr(2, 10);
};

export default idGenerator;