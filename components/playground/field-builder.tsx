// components/playground/field-builder.tsx
import { FormField } from '@/app/(preview)/types/playground';

const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'number', label: 'Number Input' },
  { value: 'date', label: 'Date Input' },
  { value: 'select', label: 'Dropdown Select' },
  { value: 'radio', label: 'Radio Buttons' },
  { value: 'checkbox', label: 'Checkboxes' },
  { value: 'textarea', label: 'Text Area' },
  { value: 'email', label: 'Email Input' },
  { value: 'tel', label: 'Phone Input' },
  { value: 'url', label: 'URL Input' }
];

export function FieldBuilder({
  field,
  onUpdate,
  onDelete
}: {
  field: FormField;
  onUpdate: (field: FormField) => void;
  onDelete: () => void;
}) {
  return (
    <div className="p-4 border border-neutral-400 rounded space-y-4 bg-neutral-50">
      {/* Basic Field Info */}
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-neutral-500 mb-1">
            Field Label
          </label>
          <input
            type="text"
            placeholder="Field Label"
            value={field.label}
            onChange={(e) => onUpdate({ ...field, label: e.target.value })}
            className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-neutral-500 mb-1">
            Field Name (ID)
          </label>
          <input
            type="text"
            placeholder="field_name"
            value={field.name}
            onChange={(e) => onUpdate({ ...field, name: e.target.value })}
            className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Field Type Selection */}
      <div>
        <label className="block text-sm font-medium text-neutral-500 mb-1">
          Field Type
        </label>
        <select
          value={field.type}
          onChange={(e) => onUpdate({ ...field, type: e.target.value as FormField['type'] })}
          className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {FIELD_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Options for select/radio/checkbox fields */}
      {(field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-neutral-500">
            Options
          </label>
          {field.options?.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => {
                  const newOptions = [...(field.options || [])];
                  newOptions[index] = e.target.value;
                  onUpdate({ ...field, options: newOptions });
                }}
                className="flex-1 p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder={`Option ${index + 1}`}
              />
              <button
                onClick={() => {
                  const newOptions = field.options?.filter((_, i) => i !== index);
                  onUpdate({ ...field, options: newOptions });
                }}
                className="px-3 py-2 bg-red-500 hover:bg-red-600 text-neutral-50 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={() => onUpdate({
              ...field,
              options: [...(field.options || []), '']
            })}
            className="w-full px-3 py-2 bg-neutral-200 hover:bg-neutral-400 text-neutral-500 rounded transition-colors"
          >
            Add Option
          </button>
        </div>
      )}

      {/* Validation Options */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-neutral-500">
          Validation
        </label>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={field.validation?.required}
            onChange={(e) => onUpdate({
              ...field,
              validation: { ...field.validation, required: e.target.checked }
            })}
            className="text-primary focus:ring-primary"
          />
          <span className="text-sm text-neutral-500">Required</span>
        </div>

        {/* Pattern validation for text-based fields */}
        {['text', 'email', 'tel', 'url'].includes(field.type) && (
          <div>
            <label className="block text-sm text-neutral-500 mb-1">
              Validation Pattern (regex)
            </label>
            <input
              type="text"
              value={field.validation?.pattern || ''}
              onChange={(e) => onUpdate({
                ...field,
                validation: { ...field.validation, pattern: e.target.value }
              })}
              className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g. ^[A-Za-z]+$"
            />
          </div>
        )}

        {/* Min/Max for number fields */}
        {field.type === 'number' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-neutral-500 mb-1">
                Minimum Value
              </label>
              <input
                type="number"
                value={field.validation?.min || ''}
                onChange={(e) => onUpdate({
                  ...field,
                  validation: { ...field.validation, min: Number(e.target.value) }
                })}
                className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-500 mb-1">
                Maximum Value
              </label>
              <input
                type="number"
                value={field.validation?.max || ''}
                onChange={(e) => onUpdate({
                  ...field,
                  validation: { ...field.validation, max: Number(e.target.value) }
                })}
                className="w-full p-2 border border-neutral-400 rounded bg-neutral-50 text-neutral-500 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Delete Field Button */}
      <div className="flex justify-end">
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-neutral-50 rounded transition-colors"
        >
          Delete Field
        </button>
      </div>
    </div>
  );
}