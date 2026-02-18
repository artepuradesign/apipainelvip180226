import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Users, Mail, Calendar } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Subscriber {
  id: number;
  full_name: string;
  email: string;
  login: string;
  subscription_status: string;
  start_date?: string;
  end_date?: string;
}

interface PlanSubscribersModalProps {
  open: boolean;
  onClose: () => void;
  planName: string;
  subscribers: Subscriber[];
}

const PlanSubscribersModal: React.FC<PlanSubscribersModalProps> = ({
  open,
  onClose,
  planName,
  subscribers,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Ativo</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expirado</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Não é possível excluir o plano
          </DialogTitle>
          <DialogDescription>
            O plano <strong>"{planName}"</strong> possui{' '}
            <strong>{subscribers.length} assinatura(s)</strong> vinculada(s).
            Remova ou migre os usuários antes de excluir.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Usuários vinculados:</span>
          </div>

          <ScrollArea className="max-h-[300px]">
            <div className="space-y-2">
              {subscribers.map((sub) => (
                <div
                  key={`${sub.id}-${sub.subscription_status}`}
                  className="flex items-center justify-between p-3 rounded-lg border bg-muted/30"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {sub.full_name || sub.login || 'Sem nome'}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      <span className="truncate">{sub.email || sub.login}</span>
                    </div>
                    {sub.end_date && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <Calendar className="h-3 w-3" />
                        <span>Até: {new Date(sub.end_date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    )}
                  </div>
                  <div className="ml-2">
                    {getStatusBadge(sub.subscription_status)}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanSubscribersModal;
