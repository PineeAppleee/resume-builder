import { ProfessionalTemplate } from './ProfessionalTemplate';
import { ModernTemplate } from './ModernTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { TechTemplate } from './TechTemplate';
import { CreativeTemplate } from './CreativeTemplate';
import { ExecutiveTemplate } from './ExecutiveTemplate';
import { StartupTemplate } from './StartupTemplate';
import { AcademicTemplate, CompactTemplate, DesignerTemplate } from './AdditionalTemplates';

import { ClassicTemplate } from './ClassicTemplate';
import { FuturisticTemplate } from './FuturisticTemplate';

export const TemplateMap: Record<string, React.FC<any>> = {
    professional: ProfessionalTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    tech: TechTemplate,
    creative: CreativeTemplate,
    executive: ExecutiveTemplate,
    startup: StartupTemplate,
    academic: AcademicTemplate,
    compact: CompactTemplate,
    designer: DesignerTemplate,
    classic: ClassicTemplate,
    futuristic: FuturisticTemplate
};

export type TemplateType = keyof typeof TemplateMap;
