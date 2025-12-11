import React from 'react';
import { TEACHER_GUIDE } from '../data';
import { FileText, Download, Printer } from 'lucide-react';
import { Boat } from '../components/Luna';

export const Teachers: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-orange-50 border-2 border-orange-200 rounded-3xl p-8 mb-8 flex items-center justify-between">
        <div>
            <h2 className="text-3xl font-bold text-orange-800 mb-2">Área do Professor</h2>
            <p className="text-orange-700">Recursos didáticos para usar o Núcleo WIT em sala.</p>
        </div>
        <div className="hidden md:block">
            <Printer size={48} className="text-orange-300" />
        </div>
      </div>

      <div className="grid gap-6">
        {TEACHER_GUIDE.map((plan: any, idx: number) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{plan.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">{plan.grade}</span>
            </div>
            
            <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>⏱ {plan.duration}</span>
                <span>🎯 {plan.goal}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl mb-4">
                <h4 className="font-bold text-gray-700 mb-2">Passo a Passo:</h4>
                <ul className="space-y-2">
                    {plan.steps.map((step: string, sIdx: number) => (
                        <li key={sIdx} className="text-gray-600 text-sm flex gap-2">
                            <span className="text-blue-500">✔</span> {step}
                        </li>
                    ))}
                </ul>
            </div>

            <button className="flex items-center gap-2 text-blue-600 font-bold hover:underline text-sm" onClick={() => alert("Simulação: Download Iniciado")}>
                <Download size={16} /> Baixar PDF
            </button>
          </div>
        ))}

        <div className="bg-white p-8 rounded-2xl shadow-sm text-center border-t-4 border-blue-500">
            <Boat mood="happy" message="Precisa de mais ajuda?" />
            <p className="mt-4 text-gray-600">
                Entre em contato com a coordenação do Núcleo WIT para agendar treinamentos ou solicitar materiais impressos.
            </p>
        </div>
      </div>
    </div>
  );
};