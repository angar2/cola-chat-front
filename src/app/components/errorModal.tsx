import { useRouter } from 'next/navigation';

type Props = {
  errorMessage: string;
};

export default function ErrorModal(props: Props) {
  const { errorMessage } = props;

  const router = useRouter();

  // 모달 닫기
  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-fit min-w-48 px-6 pt-6 pb-4 rounded bg-a shadow-lg text-center">
        <h2 className="text-base 2xl:text-lg font-medium mb-4 whitespace-nowrap">
          {errorMessage}
        </h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClose}
            className="w-16 py-2 bg-c text-a text-sm 2xl:text-base rounded"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}
