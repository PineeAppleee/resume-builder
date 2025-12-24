import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { ResumeData } from '../ResumeContext';

export const TemplateMap: Record<string, React.FC<{ data: ResumeData }>> = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
};

export type TemplateType = keyof typeof TemplateMap;
