import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { TechTemplate } from './TechTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ResumeData } from '../ResumeContext';

export const TemplateMap: Record<string, React.FC<{ data: ResumeData }>> = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    tech: TechTemplate,
    creative: CreativeTemplate,
};

export type TemplateType = keyof typeof TemplateMap;
