type StepHeaderProps = {
    title: string;
    description?: string;
  };
  
  export function StepHeader({ title, description }: StepHeaderProps) {
    return (
      <div className="space-y-1">
        <h1 className="text-[24px] font-semibold tracking-[-0.04em]">
          {title}
        </h1>
  
        {description && (
          <p className="text-sm text-[#606060]">
            {description}
          </p>
        )}
      </div>
    );
  }