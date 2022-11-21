/** @jsxImportSource @emotion/react */

interface Props {
  code: string;
}

const SummarizedCodeBox = ({ code }: Props) => {
  return (
    <div>
      <pre>{code}</pre>
    </div>
  );
};

export default SummarizedCodeBox;
