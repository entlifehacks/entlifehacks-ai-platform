import React from 'react';
import { Submission } from '../../types/questionnaire';

interface SubmissionsTableProps {
  submissions: Submission[];
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({ submissions }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ROI</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {submissions.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(submission.timestamp).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{submission.companyName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{submission.businessType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${(submission.budget / 1000).toFixed(0)}K</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">{submission.roiEstimate.toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubmissionsTable;
